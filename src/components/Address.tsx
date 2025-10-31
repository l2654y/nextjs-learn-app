"use client";

import React, { useMemo, useState } from "react";

import { Edit, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IAuthData } from "@/app/account/page";
import { addAddress, delAddress, updateAddress } from "@/actions/address";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name cannot be empty" }),
  city: z.string().min(1, { message: "City cannot be empty" }),
  address: z.string().min(1, { message: "Address cannot be empty" }),
  phone: z
    .string()
    .min(1, { message: "Phone cannot be empty" })
    .refine(
      (phoneNumber) => {
        const phoneRegex =
          /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;

        return phoneRegex.test(phoneNumber);
      },
      { error: "手机号码格式不正确" }
    ),
});

type AddressForm = z.infer<typeof formSchema>;

export interface IAddress {
  id: number;
  userId: number;
  name: string;
  city: string;
  phone: string;
  address: string;
}

interface IAddressProps {
  authData: IAuthData;
  addresses: IAddress[];
}

function Address({ authData, addresses }: IAddressProps) {
  const [operationType, setOperationType] = useState<"add" | "edit">("add");

  const dialogTitle = useMemo(() => {
    switch (operationType) {
      case "add":
        return "Add Address";
      case "edit":
        return "Edit Address";
    }
  }, [operationType]);

  const [editId, setEditId] = useState<number | null>(null);

  const [open, setOpen] = useState(false);

  const form = useForm<AddressForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      city: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit = async (values: AddressForm) => {
    const { name, city, address, phone } = values;

    let res;

    if (operationType === "add") {
      res = await addAddress({
        userId: Number(authData.id),
        name,
        city,
        phone,
        address,
      });
    } else {
      res = await updateAddress(
        { name, city, phone, address },
        editId as number
      );
    }

    toast.success(res.message);
    form.reset();
    setOpen(false);
  };

  const handleRemove = async (id: number) => {
    const res = await delAddress(id);

    toast.success(res.message);
  };

  const showEditDialog = (values: IAddress) => {
    setOperationType("edit");
    setEditId(values.id);

    form.setValue("name", values.name);
    form.setValue("city", values.city);
    form.setValue("address", values.address);
    form.setValue("phone", values.phone);

    setOpen(true);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-6 mb-4">
      <AlertDialog open={open}>
        <AlertDialogTrigger
          asChild
          onClick={() => {
            setOperationType("add");
            setEditId(null);
            setOpen(true);
          }}
        >
          <div className="border rounded-sm h-40 cursor-pointer relative text-slate-600">
            <p className="m-3">New address</p>
            <div className="absolute bottom-2 left-3">
              <Plus width={14} />
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-5">{dialogTitle}</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
            <Form {...form}>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="please enter you name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="please enter you city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="please enter you address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="please enter you phone"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <Button type="submit">Confirm</Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      {addresses.map((item) => (
        <div
          key={item.id}
          className="border rounded-sm h-40 relative text-slate-600"
        >
          <p className="m-3">{item.name}</p>
          <div className="text-sm ml-5">
            <p>{item.city}</p>
            <p>{item.address}</p>
            <p>{item.phone}</p>
          </div>
          <div className="absolute bottom-2 left-3 flex text-xs gap-2">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => showEditDialog(item)}
            >
              <Edit width={14} /> Edit
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleRemove(item.id)}
            >
              <Trash2 width={14} /> Remove
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Address;
