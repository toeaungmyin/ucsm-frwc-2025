import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "a2eqfcgkw73bkfmz.public.blob.vercel-storage.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
