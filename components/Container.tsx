import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BLOG from '@/blog.config'
import Head from 'next/head'

const Container: React.FC<any> = ({
  children,
  title,
  layout,
  fullWidth,
  coverImage,
  ...customMeta
}) => {
  const url = BLOG.path.length ? `${BLOG.link}/${BLOG.path}` : BLOG.link
  const meta = {
    title: title || BLOG.title,
    type: 'website',
    ...customMeta
  }
  const image =
    coverImage ||
    `${BLOG.ogImageGenerateURL}/${encodeURIComponent(
      meta.title
    )}.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fnobelium.vercel.app%2Flogo-for-dark-bg.svg`

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        {/* <meta content={BLOG.darkBackground} name="theme-color" /> */}
        <meta name='robots' content='follow, index' />
        <meta charSet='UTF-8' />
        {BLOG.seo.googleSiteVerification && (
          <meta
            name='google-site-verification'
            content={BLOG.seo.googleSiteVerification}
          />
        )}
        {BLOG.seo.keywords && (
          <meta name='keywords' content={BLOG.seo.keywords.join(', ')} />
        )}
        <meta name='description' content={meta.description} />
        <meta property='og:locale' content={BLOG.lang} />
        <meta property='og:title' content={meta.title} />
        <meta property='og:description' content={meta.description} />
        <meta
          property='og:url'
          content={meta.slug ? `${url}/${meta.slug}` : url}
        />
        <meta property='og:type' content={meta.type} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:description' content={meta.description} />
        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:image' content={image} />
        <meta property='og:image' content={image} />
        {meta.type === 'article' && (
          <>
            <meta
              property='article:published_time'
              content={meta.date || meta.createdTime}
            />
            <meta property='article:author' content={BLOG.author} />
          </>
        )}
      </Head>
      <div
        className={`wrapper ${
          BLOG.font === 'serif' ? 'font-serif' : 'font-sans'
        }`}
      >
        <Header
          navBarTitle={layout === 'blog' ? meta.title : null}
          fullWidth={fullWidth}
        />
        <main
          className={`m-auto flex-grow w-full transition-all ${
            !fullWidth ? 'max-w-5xl px-4 md:px-0' : 'px-4 md:px-24'
          }`}
        >
          {children}
        </main>
        <Footer fullWidth={fullWidth} />
      </div>
    </div>
  )
}

export default Container
