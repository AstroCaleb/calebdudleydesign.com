import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

interface AppProviderProps {
  isContactFormOpen: boolean;
  setIsContactFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isImageViewerOpen: boolean;
  setIsImageViewerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageViewerArray: { src: string; alt?: string }[];
  setImageViewerArray: React.Dispatch<
    React.SetStateAction<{ src: string; alt?: string }[]>
  >;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppProviderProps>({
  isContactFormOpen: false,
  setIsContactFormOpen: () => {},
  isImageViewerOpen: false,
  setIsImageViewerOpen: () => {},
  imageViewerArray: [],
  setImageViewerArray: () => {},
  isDarkMode: false,
  setIsDarkMode: () => {},
});

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imageViewerArray, setImageViewerArray] = useState<
    { src: string; alt?: string }[]
  >([]);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem('darkMode', 'true');
    } else {
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  return (
    <AppContext
      value={{
        isContactFormOpen,
        setIsContactFormOpen,
        isImageViewerOpen,
        setIsImageViewerOpen,
        imageViewerArray,
        setImageViewerArray,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </AppContext>
  );
};
