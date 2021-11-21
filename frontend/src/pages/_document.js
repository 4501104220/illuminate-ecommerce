import React from "react";
import Document, {Html, Head, Main, NextScript} from "next/document";
import {ServerStyleSheets} from "@material-ui/core/styles";
import theme from "configs/theme";

const injectScipt = () => {
    return (
        <script>
            dangerouslySetInnerHTML=
            {{
                __html: `
              if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
             }
                  `,
            }}
        </script>

    );
};

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="vi">
                <Head>
                    {/* PWA primary color */}
                    <meta name="theme-color" content={theme.palette.primary.main}/>
                    {/*<meta name="google-site-verification" content="xOiawMYiDPnEaGoMoSURX3aVkbR8-bfbGMtT1d4oFrE"/>*/}
                    {/*<link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/ebicycle-rental.appspot.com/o/favicon.ico?alt=media&token=9a0a97ff-6014-48d4-97d7-355da0e7782b" />*/}
                    {/*<meta property="og:url" content="https://illuminate-ecommerce.vercel.app"/>*/}
                    {/*<meta property="og:type" content="website"/>*/}
                    {/*<meta property="og:image:width" content="600"/>*/}
                    {/*<meta property="og:image:height" content="315"/>*/}
                    {/*<meta property="og:image"*/}
                    {/*      content="https://www.facebook.com/illuminate.ecommerce/photos/a.257648696148235/295253785721059"/>*/}
                    {/*<meta property="og:title" content="Shop Illuminate - Team Illuminate"/>*/}
                    {/*<meta property="og:site_name"*/}
                    {/*      content="https://illuminate-ecommerce.vercel.app"/>*/}

                    <meta name="google-site-verification" content="F6ag8uIwxMpwP8v8Q7ggfql2lZ9kGD2bclpPfI_k_Jc" />
                    <meta charSet="utf-8"/>
                    <title>Shop Illuminate | Mua hàng online giá tốt, hàng chuẩn, ship nhanh</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#000000"/>
                    <meta name="title"
                          content="Shop Illuminate | Mua Sắm Thỏa Thích, Giá Rẻ Bất Ngờ, Đa Dạng Sản Phẩm, Flash Sale, Freeship, Hỗ Trợ Đổi Trả, Chăm Sóc Khách Hàng 24/7, Sản Phẩm Chất Lượng Tốt Cao"/>
                    <meta name="description"
                          content="Shop Illuminate | Mua Sắm Thỏa Thích, Giá Rẻ Bất Ngờ, Đa Dạng Sản Phẩm, Flash Sale, Freeship, Hỗ Trợ Đổi Trả, Chăm Sóc Khách Hàng 24/7, Sản Phẩm Chất Lượng Tốt Cao"/>
                    <meta name="keywords"
                          content="Shop Illuminate, shopilluminate, shop illuminate, Shopilluminate, illuminate-ecommerce.vercel.app, illuminate-ecommerce, illuminate ecommerce vercel app, illuminate-ecommerce vercel app, illuminate shop, illuminate, SHOPILLUMINATE"/>
                    <link rel="stylesheet"
                          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
                    <link rel="stylesheet"
                          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"/>
                    <link rel="stylesheet"
                          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
                    <link rel="stylesheet"
                          href="https://fonts.googleapis.com/icon?family=Material+Icons"/>

                    <script async
                            src="https://www.googletagmanager.com/gtag/js?id=G-L20NH7L0T8"></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date()); gtag('config', 'G-L20NH7L0T8');`,
                        }}
                    />
                </Head>
                <body>
                <h1>
                    Shop Illuminate | Mua hàng online giá tốt, hàng chuẩn, ship nhanh
                </h1>
                <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PPQNV2S"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}>
                </noscript>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};
