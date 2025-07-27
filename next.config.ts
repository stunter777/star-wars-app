import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/people",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
