import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { MantineProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
import App from "./App"
import "./index.css"
import { Provider } from "react-redux"
import store from "./store"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "Open Sans, sans-serif",
            fontFamilyMonospace: "Monaco, Courier, monospace",
            headings: { fontFamily: "Open Sans, sans-serif" },
            colors: {
              "m-orange": [
                "#CFAAA0",
                "#CFA295",
                "#CF9A8A",
                "#D1917F",
                "#D38872",
                "#D77E65",
                "#DD7456",
                "#D47256",
                "#CB7056",
                "#C26E56",
              ],
            },
            primaryColor: "m-orange",
          }}
        >
          <NotificationsProvider position="top-right">
            <App />
          </NotificationsProvider>
        </MantineProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
