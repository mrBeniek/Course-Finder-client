import RecEmail from 'components/recEmail/RecEmail';
import Layout from 'components/layout/Layout';

const RecEmailPage = () => {
  return (
    <div>
      <Layout title="Password recovery">
        <RecEmail />
      </Layout>
    </div>
  );
};

export default RecEmailPage;
