import React, { useEffect, useState } from 'react';
import { Header } from './components/HeaderBar';
import { Footer } from './components/Footer';
import { Introduction } from './components/Introduction';
import { PortfolioItem, PortfolioItemProps } from './components/PortfolioItem';
import { ContactForm } from './components/ContactForm';
import { LightboxWrapper } from './components/LightboxWrapper';
import { useAppContext } from './useAppContext';

const SectionGroup: React.FC<{ children: React.ReactNode; label: string }> = ({
  children,
  label,
}) => {
  return (
    <section className="grouping">
      <h2 className="sub-header" tabIndex={0}>
        {label}
      </h2>
      <div className="sub-header-spacer"></div>
      {children}
    </section>
  );
};

export const App: React.FC = () => {
  const { isDarkMode } = useAppContext();
  const [employmentData, setEmploymentData] = useState<PortfolioItemProps[]>(
    [],
  );
  const [forFunData, setForFunData] = useState<PortfolioItemProps[]>([]);
  const [clientsData, setClientsData] = useState<PortfolioItemProps[]>([]);
  const [internshipsData, setInternshipsData] = useState<PortfolioItemProps[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      // Fetch employment data
      const employmentResponse = await fetch('/json/employment.json');
      const employmentData = await employmentResponse.json();
      setEmploymentData(employmentData);
      // Fetch for fun data
      const forFunResponse = await fetch('/json/just-for-fun.json');
      const forFunData = await forFunResponse.json();
      setForFunData(forFunData);
      // Fetch clients data
      const clientsResponse = await fetch('/json/clients.json');
      const clientsData = await clientsResponse.json();
      setClientsData(clientsData);
      // Fetch internships data
      const internshipsResponse = await fetch('/json/internships.json');
      const internshipsData = await internshipsResponse.json();
      setInternshipsData(internshipsData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    setTimeout(() => {
      document.body.classList.remove('initial-load');
      document.body.removeAttribute('style');
    }, 300);
  }, []);

  return (
    <>
      <Header />

      <div id="content-wrapper">
        <Introduction />

        <section className="work-wrapper">
          <h1 className="header">Recent adventures</h1>
          <SectionGroup label="Employment">
            {employmentData?.map((employment: PortfolioItemProps, index) => (
              <PortfolioItem
                key={`employment.companyName-${index}`}
                data={employment}
              />
            ))}
          </SectionGroup>
          <SectionGroup label="Just For Fun">
            {forFunData?.map((forFun: PortfolioItemProps, index) => (
              <PortfolioItem
                key={`forFun.companyName-${index}`}
                data={forFun}
              />
            ))}
          </SectionGroup>
          <SectionGroup label="Clients">
            {clientsData?.map((client: PortfolioItemProps, index) => (
              <PortfolioItem
                key={`client.companyName-${index}`}
                data={client}
              />
            ))}
          </SectionGroup>
          <SectionGroup label="Internships">
            {internshipsData?.map((internship: PortfolioItemProps, index) => (
              <PortfolioItem
                key={`internship.companyName-${index}`}
                data={internship}
              />
            ))}
          </SectionGroup>
        </section>
      </div>

      <Footer />
      <ContactForm />
      <LightboxWrapper />
    </>
  );
};
