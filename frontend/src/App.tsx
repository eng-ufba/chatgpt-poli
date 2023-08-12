import { ReactElement, useState } from 'react';
import { Home } from './pages/Home/Home';
import { TermosDeUso } from './pages/TermosDeUso/TermosDeUso';
import { PoliticaDePrivacidade } from './pages/PoliticaDePrivacidade/PoliticaDePrivacidade';
import { ContextPage, PAGE_VALUE, Page, SetContextPage } from './helpers/page-manager/pageManager';
import './App.scss';
import { ChatsStore } from './helpers/stores/chats/ChatsStore';

export const App = (): ReactElement => {
  const [page, setPage] = useState<Page>(() => PAGE_VALUE.HOME);

  const CurrentPage = (): ReactElement => {
    switch(page) {
      case 'HOME': {
        return <Home />
      }
      case 'POLITICA_DE_PRIVACIDADE': {
        return <PoliticaDePrivacidade />
      }
      case 'TERMOS_DE_USO': {
        return <TermosDeUso />
      }
      default: {
        return <Home />
      }
    }
  }

  return (
    <div className="App">
      <ChatsStore>
      <ContextPage.Provider value={page}>
       <SetContextPage.Provider value={setPage}>
        <CurrentPage />
      </SetContextPage.Provider>
      </ContextPage.Provider>
      </ChatsStore>
    </div>
  );
}
