"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Select,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormInput from "@/components/FormInput";
import { CustomBtn } from "@/components/CustomBtn";
import { _COLORS } from "@/constant/colors";
import { postJobs } from "../service";


const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const PostJob = ({ data, isOpen, onClose, finalFocusRef, refetch }) => {
  const queryClient = useQueryClient();

  const extractListItems = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const items = Array.from(doc.querySelectorAll("li")).map(
      (li) => li.textContent?.trim() || ""
    );
    return items.filter(Boolean);
  };

  const [value, setValue] = useState("");
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    experience: "",
    jobType: "",
    priceModel: "",
    budget: "",
    skill: "",
  });


  useEffect(() => {
    if (data) {
      setFormValues({
        title: data.title || "",
        description: data.description || "",
        experience: data.experience || "",
        jobType: data.jobType || "",
        priceModel: data.priceModel || "",
        budget: data.budget?.toString() || "",
        skill: data.skill || "",
      });

      if (Array.isArray(data.responsibilities)) {
        const html = `<ul>${data.responsibilities
          .map((item) => `<li>${item}</li>`)
          .join("")}</ul>`;
        setValue(html);
      }
    } else {
      setFormValues({
        title: "",
        description: "",
        experience: "",
        jobType: "",
        priceModel: "",
        budget: "",
        skill: "",
      });
      setValue("");
    }
  }, [data, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: postClientJob, isPending } = useMutation({
    mutationFn: postJobs,
    mutationKey: ["job"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      refetch?.();
      onClose();
      setValue("");
      setFormValues({
        title: "",
        description: "",
        experience: "",
        jobType: "",
        priceModel: "",
        budget: "",
        skill: "",
      });
    },
    onError: (error) => {
      console.error("Job post failed:", error);
      alert("Something went wrong while posting the job.");
    },
  });

  const { mutate: draftClientJob, isPending: pending } = useMutation({
    mutationFn: postJobs,
    mutationKey: ["job"],
    onSuccess: () => {
      refetch?.();
      onClose();
      setValue("");
      setFormValues({
        title: "",
        description: "",
        experience: "",
        jobType: "",
        priceModel: "",
        budget: "",
        skill: "",
      });
    },
    onError: (error) => {
      console.error("Job draft failed:", error);
      alert("Something went wrong while saving the draft.");
    },
  });

  const handleSubmit = () => {
    const responsibilitiesArray = extractListItems(value);
    const payload = {
      ...formValues,
      responsibilities: responsibilitiesArray,
      budget: parseFloat(formValues.budget),
    };

    if (data?._id) {
      postClientJob({ ...payload, isEdit: true, jobId: data._id });
    } else {
      postClientJob(payload);
    }
  };

  const handleSaveAsDraft = () => {
    const responsibilitiesArray = extractListItems(value);
    const payload = {
      ...formValues,
      responsibilities: responsibilitiesArray,
      budget: parseFloat(formValues.budget),
      status: "drafted",
    };
    draftClientJob(payload);
  };

  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="lg"
        finalFocusRef={finalFocusRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="#141414" color="#fff">
          <DrawerCloseButton bg="#FBBF24" color="#000" />
          <DrawerHeader>{!data ? "Post New Job" : "Edit Job"}</DrawerHeader>

          <DrawerBody mt="40px">
            <FormInput
              label="Job Title"
              focusBorderColor={_COLORS?.brand}
              name="title"
              value={formValues?.title}
              handleChange={handleChange}
            />
            <FormInput
              lines={5}
              label="Description"
              focusBorderColor={_COLORS?.brand}
              mt="30px"
              name="description"
              value={formValues?.description}
              handleChange={handleChange}
            />
            <Box my="20px">
              <Text fontSize="1em" fontWeight={600} pb="5px">
                Key Responsibilities
              </Text>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                style={{
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  backgroundColor: "transparent",
                }}
              />
            </Box>
            <FormInput
              lines={5}
              label="Required Skills"
              focusBorderColor={_COLORS?.brand}
              mt="30px"
              name="skill"
              value={formValues?.skill}
              handleChange={handleChange}
            />
            <Box my="20px">
              <FormLabel>Experience Level</FormLabel>
              <Select
                value={formValues?.experience}
                focusBorderColor={_COLORS?.brand}
                name="experience"
                onChange={handleChange}
                fontWeight="bold"
              >
                <option value="Entry Level" style={{ color: "black" }}>
                  Entry Level
                </option>
                <option value="Mid Level" style={{ color: "black" }}>
                  Mid Level
                </option>
                <option value="Senior Level" style={{ color: "black" }}>
                  Senior Level
                </option>
                <option value="Intern" style={{ color: "black" }}>
                  Intern
                </option>
              </Select>
            </Box>
            <Box>
              <FormLabel>Job Type</FormLabel>
              <Select
                value={formValues?.jobType}
                focusBorderColor={_COLORS?.brand}
                name="jobType"
                onChange={handleChange}
                fontWeight="bold"
              >
                <option value="full-time" style={{ color: "black" }}>
                  Full-Time
                </option>
                <option value="part-time" style={{ color: "black" }}>
                  Part-Time
                </option>
                <option value="contract" style={{ color: "black" }}>
                  Contract
                </option>
                <option value="all-types" style={{ color: "black" }}>
                  All Types
                </option>
              </Select>
            </Box>
            <Box my="20px">
              <FormLabel>Pricing Model</FormLabel>
              <Select
                value={formValues?.priceModel}
                name="priceModel"
                onChange={handleChange}
                fontWeight="bold"
                focusBorderColor={_COLORS?.brand}
              >
                <option value="hourly" style={{ color: "black" }}>
                  Hourly
                </option>
                <option value="daily" style={{ color: "black" }}>
                  Daily
                </option>
                <option value="monthly" style={{ color: "black" }}>
                  Monthly
                </option>
                <option value="fixed" style={{ color: "black" }}>
                  Fixed
                </option>
              </Select>
            </Box>
            <FormInput
              label="Budget"
              name="budget"
              value={formValues?.budget}
              focusBorderColor={_COLORS?.brand}
              handleChange={handleChange}
            />
          </DrawerBody>

          <DrawerFooter>
            <Flex align="center" gap="40px">
              <CustomBtn
                bg="#FBBF24"
                color="#000"
                handleClick={handleSubmit}
                text={!data ? "Post Job" : "Update Job"}
                loading={isPending}
              />
              {!data && (
                <CustomBtn
                  bg="none"
                  border="1px solid #fff"
                  color="#fff"
                  handleClick={handleSaveAsDraft}
                  text="Save as Draft"
                  loading={pending}
                />
              )}
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default PostJob;
