import { SitemapStream, streamToPromise } from "sitemap";

export default async (req, res) => {
    try {
        const smStream = new SitemapStream({
            hostname: `https://illuminate-ecommerce.vercel.app`,
            cacheTime: 600000,
        });

        // List of posts
        const post_slugs = [
            "category/giay-nam",
            "category/giay-nu",
            "category/thoi-trang",
            "category/sac-dep",
            "category/thiet-bi-dien-tu",
            "category/hang-quoc-te",
            "category/dien-tu-dien-lanh",
            "category/the-thao-da-ngoai",
            "category/do-choi-me-va-be",
            "category/may-anh",
            "category/dien-gia-dung",
            "category/bach-hoa",
            "category/thiet-bi-so",
            "category/nha-cua-doi-song"
        ];

        // Create each URL row
        post_slugs.forEach((post) => {
            smStream.write({
                url: `${post}`,
                changefreq: "daily",
                priority: 0.9,
            });
        });


        // End sitemap stream
        smStream.end();

        // XML sitemap string
        const sitemapOutput = (await streamToPromise(smStream)).toString();

        // Change headers
        res.writeHead(200, {
            "Content-Type": "application/xml",
        });

        // Display output to user
        res.end(sitemapOutput);
    } catch (e) {
        console.log(e);
        res.send(JSON.stringify(e));
    }
};
