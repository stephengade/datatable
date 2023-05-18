import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { StyledEngineProvider } from "@mui/material/styles";

function InjectTailwind({ children }: any) {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <InjectTailwind>
        <Component {...pageProps} />
      </InjectTailwind>
    </>
  )
}
