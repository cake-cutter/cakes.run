import '../styles/globals.css';
import '../styles/prism.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {

	return (
		<div className="min-h-screen w-screen overflow-y-hidden">
			<Component {...pageProps} />
		</div>
	)	
}

export default MyApp
