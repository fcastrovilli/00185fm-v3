const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }
  const parallelRedirects = [
    {
      source: '/episodes',
      destination: '/archive',
      permanent: true,
    },
    {
      source: '/shows',
      destination: '/archive',
      permanent: true,
    },
    {
      source: '/artists',
      destination: '/archive',
      permanent: true,
    },
  ]

  const redirects = [internetExplorerRedirect, ...parallelRedirects]

  return redirects
}

export default redirects
