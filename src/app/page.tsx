"use client";
import { Modal } from "@/components";
import { MyContextProvider } from "@/Contexts/MyContext";
import { SearchInput } from "@/components/molecules/Search";
import { Form } from "@/components/molecules";
export default function Home() {
  return (
    <>
      <MyContextProvider>
        <div>
          <SearchInput></SearchInput>
          <Modal>
            <Form></Form>
          </Modal>
        </div>
      </MyContextProvider>
    </>
  );
}
