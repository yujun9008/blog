import BLOG from '#/blog.config';
import { motion } from 'framer-motion';
import Footer from '~/components/Footer';
import Header from '~/components/Header';

const Container: React.FC<any> = ({
  children,
  title,
  layout,
  fullWidth,
  ...customMeta
}) => {
  const meta = {
    title: title || BLOG.title,
    type: 'website',
    ...customMeta,
  };

  return (
    <div>
      <motion.div
        className={`wrapper ${
          BLOG.font === 'serif' ? 'font-serif' : 'font-sans'
        }`}
        initial={{ opacity: 0, y: 10, scale: 1, translateZ: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1, translateZ: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Header
          navBarTitle={layout === 'blog' ? meta.title : null}
          fullWidth={fullWidth}
        />
        <motion.main
          className={`m-auto flex-grow w-full transition-all ${
            !fullWidth ? 'max-w-[60rem] px-4 md:px-0' : 'px-4 md:px-24'
          }`}
        >
          {children}
        </motion.main>
        <Footer fullWidth={fullWidth} />
      </motion.div>
    </div>
  );
};

export default Container;
