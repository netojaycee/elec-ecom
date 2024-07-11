import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function CustomAccordion({ open, handleOpen }) {
  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open}  />} className="mb-2 rounded-md border-2 border-gray-300 px-4 bg-white">
        <AccordionHeader onClick={() => handleOpen(1)}>
          How can I place an order?{" "}
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />} className="mb-2 rounded-md border-2 border-gray-300 px-4 bg-white">
        <AccordionHeader onClick={() => handleOpen(2)}>
          What payment methods do you accept?{" "}
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />} className="mb-2 rounded-md border-2 border-gray-300 px-4 bg-white">
        <AccordionHeader onClick={() => handleOpen(3)}>
          How can I place an order?{" "}
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 4} icon={<Icon id={4} open={open} />} className="mb-2 rounded-md border-2 border-gray-300 px-4 bg-white">
        <AccordionHeader onClick={() => handleOpen(4)}>
          How can I place an order?{" "}
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion>


      <Accordion open={open === 5} icon={<Icon id={5} open={open} />} className="mb-2 rounded-md border-2 border-gray-300 px-4 bg-white">
        <AccordionHeader onClick={() => handleOpen(5)}>
          How can I place an order?{" "}
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion>
    </>
  );
}

export default function Support() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-background_bl text-2xl lg:text-4xl font-bold mt-2">
          Frequently Asked Questions
        </h1>
        <p className="w-[90%] lg:w-[35%] mx-auto text-center mb-5">
          Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
          phasellus mollis sit aliquam sit nullam.
        </p>
        <div className="w-full md:w-[85%] mx-auto">
          <CustomAccordion open={open} handleOpen={handleOpen} />
        </div>
      </div>
    </>
  );
}
