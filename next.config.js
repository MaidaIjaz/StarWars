module.exports={
    // Whenever we use special image tag we have to let Nextjs know from where we are going to full the images
    images: {
        domains: ['https://swapi.dev/api/'],
    },
    experimental: {
        scrollRestoration: true,
    },
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
      ],
}


