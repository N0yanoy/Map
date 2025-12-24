import { Theme } from "@radix-ui/themes";
import { CustomMap } from "./components/map/CustomMap";

const App = () => {
  return (
    <Theme
      appearance="light"
      accentColor="blue"
      grayColor="slate"
      radius="full"
      scaling="105%"
    >
      <CustomMap />
    </Theme>
  );
};

export default App;
