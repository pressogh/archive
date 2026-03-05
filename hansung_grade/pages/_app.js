import { NextUIProvider } from '@nextui-org/react'
import { RecoilRoot } from 'recoil'
import { ToastContainer, Slide } from 'react-toastify'
import Layout from '@/layouts/Layout'

import 'react-toastify/dist/ReactToastify.min.css'
import "@/styles/globals.scss";

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
            </NextUIProvider>
        </RecoilRoot>
    )
}
