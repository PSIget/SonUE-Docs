import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import DownloadList from "components/DownloadList";
import { Loader } from "components/Loader";
import { modalSubtitle, modalTitle } from "./text";
import { CTAButton } from "../components/CTAButton";
import useLocalesMap from "utils/use-locales-map";

const DynamicModal = dynamic(() => import("components/Modal"), { ssr: true });

interface Additional {
  icon: string;
  external_link: boolean;
}

interface DownloadFile {
  name: string;
  description: string;
  size: number;
  url: string;
  additional: Additional;
}

interface Group {
  groupType: string;
  files: DownloadFile[];
}

interface Version {
  version: string;
  groups: Group[];
}

interface Props {
  data?: Version[] | null;
  buttonText: string;
  limit?: boolean; // Обновленный тип пропсов
}

export const DownloadModal: React.FC<Props> = ({
  buttonText,
  limit = true,
}) => {
  const modalTitleText = useLocalesMap(modalTitle);
  const modalSubtitleText = useLocalesMap(modalSubtitle);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Version[] | null>(null);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
    setIsLoading(true);
  }, []);

  const handleCloseModal = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      event.preventDefault();
      setIsModalOpen(false);
      setIsLoading(false);
    },
    []
  );

  useEffect(() => {
    let isMounted = true; // Добавить эту переменную

    const fetchData = async (): Promise<void> => {
      try {
        const res = await fetch("/api/downloads/game");
        if (!res.ok) {
          throw new Error("An error occurred while fetching the data.");
        }
        const json = await res.json();
        if (isMounted) {
          setData(json.data); // <-- Изменено с setData(json);
          setIsLoading(false);
        }
      } catch (error: unknown) {
        if (error instanceof Error && isMounted) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };

    if (!data) {
      fetchData();
    }

    return () => {
      isMounted = false; // Обновить эту переменную в функции очистки
    };
  }, [data]);

  return (
    <>
      <CTAButton limit={limit} onClick={handleOpenModal}>
        {isLoading ? <Loader /> : buttonText}
      </CTAButton>
      <AnimatePresence>
        {isModalOpen && (
          <DynamicModal
            title={modalTitleText}
            subTitle={modalSubtitleText}
            onClose={handleCloseModal}
          >
            <div>
              {error ? (
                <div>Error: {error}</div>
              ) : data ? (
                <DownloadList data={data} />
              ) : (
                <Loader />
              )}
            </div>
          </DynamicModal>
        )}
      </AnimatePresence>
    </>
  );
};
