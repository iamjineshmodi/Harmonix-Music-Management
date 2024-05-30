
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images:{
    domains:['nextui.org']
  },
  webpack:(config)=>{
    config.resolve = {
      ...config.resolve,
      fallback:{
        "fs":false,
        "path":false,
        "net":false,
        "dns":false,
        "tls":false
      }
    }
    return config
  }
};

export default nextConfig;
