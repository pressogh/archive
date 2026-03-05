const intercept = require("intercept-stdout")

// safely ignore recoil stdout warning messages 
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return ''
  }
  return text
}

// Intercept in dev and prod
intercept(interceptStdout)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['info.hansung.ac.kr']
  },
  // To Fix Nextjs Runs useEffect Twice
  // https://github.com/vercel/next.js/issues/35957
  reactStrictMode: false, // default => true
}

module.exports = nextConfig