const allowedNamespaces = require('./namespaces.json').map(name => name.toLowerCase());

// If it's a resource, then parse out the module.
const getModuleName = dependency => dependency.value.split("!")[0];

// Helper to check if a dependency is deprecated and report if it is.
const shouldApplyRule = (dependency) => {
    // It has to be a string, that starts with "epi" to be a possible Episerver module.
    if (dependency.type !== "Literal") { return false; }

    const depModule = getModuleName(dependency);

    // Check if it's an Episerver module.
    const dep = depModule.toLowerCase();
    if (!allowedNamespaces.some(ns => dep.startsWith(`${ns}/`))) { return false; }

    return true;
}

const isDefine = (node) => {
    if (node.callee.name !== 'define') { return false; }

    return !node.arguments.find(node => node.type === 'ArrayExpression');
};

// Helper to check if a dependency is deprecated and report if it is.
const applyRule = (context, isViolationFunc, messageId) => (dependency) => {
    // It has to be a string, that starts with "epi" to be a possible Episerver module.
    if (dependency.type !== "Literal") { return; }

    // If it's a resource, then parse out the module.
    const depModule = dependency.value.split("!")[0];

    // Check if it's an Episerver module.
    const dep = depModule.toLowerCase();
    if (!allowedNamespaces.some(ns => dep.startsWith(`${ns}/`))) { return; }

    // Check that it's not a deprecated module.
    if (!isViolationFunc(dep)) { return; }

    // It was a internal module. Report.
    context.report({
        node: dependency,
        messageId: messageId,
        data: { moduleName: depModule }
    });
}

module.exports = {

    getModuleName,
    isDefine,
    shouldApplyRule,

    // Helper to apply the rule to all the dependencies.
    analyseDefine: (context, isViolationFunc, messageId, defineNode) => {
        const dependencyNode = defineNode.arguments.find(node => node.type === 'ArrayExpression');

        if (!dependencyNode) { return; }

        dependencyNode.elements.forEach(applyRule(context, isViolationFunc, messageId));
    }

}
