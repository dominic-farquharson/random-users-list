import Head from "next/head";
import { Inter } from "next/font/google";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getUsers } from "@/services/randomUserApi";
import { GetUsersResponse } from "@/services/randomUserApi.types";
import { ZodError, z } from "zod";
import { pageSchema } from "@/schemas/pageSchema";
import Error from "next/error";
import {
  Box,
  Container,
  Pagination,
  PaginationProps,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { TOTAL_PAGES } from "@/constants/constants";
import { useState } from "react";
import { UserDetail } from "@/components/UserDetail/UserDetail";
import { UsersList } from "@/components/UsersList/UsersList";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps<{
  users: GetUsersResponse["results"];
  error?: string;
  statusCode: number;
}> = async (props) => {
  try {
    const page = pageSchema.parse(
      props.query.page ? Number(props.query.page) : 1
    );
    const response = await getUsers({
      page,
    });

    return { props: { users: response.results, statusCode: 200 } };
  } catch (e) {
    let error = "",
      statusCode = 500;
    if (e instanceof ZodError) {
      error = e.errors[0].message;
      statusCode = 400;
    } else if (e instanceof Error && "message" in e) {
      error = e.message as string;
    } else {
      error = e as string;
    }

    return {
      props: {
        users: [],
        error,
        statusCode,
      },
    };
  }
};

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const page = useSearchParams().get("page");
  const defaultPage = page ? Number(page) : 1;
  const [userDetail, setUserDetail] = useState<
    GetUsersResponse["results"][0] | null
  >(null);

  if (props.error) {
    return <Error statusCode={props.statusCode} title={props.error} />;
  }

  const handlePageChange: PaginationProps["onChange"] = (_, page) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    router.push(url);
  };

  return (
    <>
      <Head>
        <title>Random users</title>
        <meta name="description" content="View a list of random users" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <Container
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
          maxWidth="lg"
        >
          {userDetail ? (
            <UserDetail
              user={userDetail}
              handleBackBtnClick={() => setUserDetail(null)}
            />
          ) : (
            <UsersList
              handlePageChange={handlePageChange}
              setUserDetail={setUserDetail}
              users={props.users}
              defaultPage={defaultPage}
            />
          )}
        </Container>
      </main>
    </>
  );
}
