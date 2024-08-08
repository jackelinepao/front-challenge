import { ApolloProvider } from "@apollo/client";
import "./App.css";
import { AppRouter } from "./shared/routes/AppRouter";
import { createTheme, MantineProvider } from "@mantine/core";
import { graphqlClient } from "./shared/graphql/client";
import { themeOverride } from "./shared/theme/mantine-theme";
import { Layout } from "./components/Layout";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "remixicon/fonts/remixicon.css";

const theme = createTheme(themeOverride);
function App() {
  return (
    <ApolloProvider client={graphqlClient}>
      <MantineProvider
        withCssVariables
        withGlobalClasses
        withStaticClasses
        defaultColorScheme="dark"
        theme={theme}
      >
        <div>
          <Layout>
            <AppRouter />
          </Layout>
        </div>
      </MantineProvider>
    </ApolloProvider>
  );
}

export default App;
