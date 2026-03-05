import { NextUIProvider } from '@nextui-org/react'
import { RecoilRoot } from 'recoil'
import { ToastContainer, Zoom, Slide } from 'react-toastify'
import Layout from '@/layouts/Layout'

import 'react-toastify/dist/ReactToastify.min.css'

export default function App({ Component, pageProps }) {
    return (
        <RecoilRoot>
            <NextUIProvider>
                <Layout>
                    <div>
                        <Component {...pageProps} />
                        <ToastContainer
                            position="top-center"
                            autoClose={3000}
                            pauseOnHover={false}
                            pauseOnFocusLoss={false}
                            hideProgressBar={true}
                            transition={Slide}
                            style={{ width: '40vw' }}
                            theme={'colored'}
                        />
                    </div>
                </Layout>

                <style jsx>{`
                    .container {
                        margin: 0 0 0 10vw;
                    }
                `}</style>
            </NextUIProvider>
        </RecoilRoot>
    )
}
