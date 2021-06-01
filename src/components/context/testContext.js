import React from "react";

const TestContext=React.createContext('');
const TestProvider=TestContext.Provider;
const TestConsumer=TestContext.Consumer;

export {TestConsumer,TestProvider,TestContext};