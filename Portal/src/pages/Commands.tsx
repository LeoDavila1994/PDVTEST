import AuthLayout from '../components/AuthLayout';
import Card from '../components/Card';
import TopbarCommand from '../components/TopbarCommand';
import UnitsCard from '../components/UnitsCard';

const Commands = () => {
  return (
    <>
      <AuthLayout menuOption="Comanda">
        <main className="w-full flex flex-col gap-10">
          <section>
            <div className="w-full h-7 flex text-center gap-3">
              <div className="w-28 h-full border-b-4 border-gray-400 cursor-pointer font-semibold text-gray-400 hover:opacity-80 duration-200">
                MESAS
              </div>
              <div className="w-28 h-full border-b-4 border-gray-400 cursor-pointer font-semibold text-gray-400 hover:opacity-80 duration-200">
                BEBIDAS
              </div>
              <div className="w-28 h-full border-b-4 border-primary-600 cursor-pointer font-semibold text-primary-600">
                ALIMENTOS
              </div>
            </div>
          </section>
          <section className="breadcrumb lg:flex items-start">
            <TopbarCommand />
          </section>
          <section>
            <UnitsCard />
          </section>
          <section className="w-full h-full flex justify-center flex-wrap gap-10">
            <Card />
          </section>
        </main>
      </AuthLayout>
    </>
  );
};

export default Commands;
