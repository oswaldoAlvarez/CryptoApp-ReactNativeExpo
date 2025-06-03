import Reactotron from "reactotron-react-native";

Reactotron.configure().useReactNative().connect();

console.tron = Reactotron;
console.log = Reactotron.log;

export default Reactotron;
