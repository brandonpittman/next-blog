import Layout from "@components/layout";
import { quotes, getRandomQuote } from "./api/stoic";
import { useRouter, NextRouter } from "next/router";

const meta = {
  title: "Random Stoic Quote",
  description: "A small app that outputs a random Stoic quote.",
};

type Philosopher = "Marcus Aurelius" | "Seneca";
type StoicProps = { author: Philosopher; text: string; source: string };

const refreshData = (router: NextRouter) => {
  router.replace(router.asPath);
};

const Stoic = ({ author, text, source }: StoicProps) => {
  const router = useRouter();

  return (
    <Layout className="prose dark:prose-dark" meta={meta}>
      <h2 className="flex items-center space-x-2">
        <span>Random Stoic Quote</span>
        <button
          className="px-2 py-1 my-4 text-xs font-medium text-blue-400 border border-transparent rounded-md focus:ring focus:outline-none"
          onClick={() => refreshData(router)}
        >
          <span className="sr-only">Refresh quote</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </h2>
      <blockquote className="whitespace-pre-line">{text}</blockquote>
      <i>
        {author} - {source}
      </i>
    </Layout>
  );
};

export async function getServerSideProps() {
  const props = getRandomQuote(quotes);
  return {
    props,
  };
}

export default Stoic;