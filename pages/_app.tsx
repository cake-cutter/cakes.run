import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {

	return (
		<div className="min-h-screen w-screen">
			<Component {...pageProps} />
		</div>
	)	
}

export default MyApp
