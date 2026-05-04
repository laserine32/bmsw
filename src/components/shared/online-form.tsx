"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CircleNotchIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import useDebounce from "@/hooks/use-debounce";
import { CardSkeleton } from "./skeletons";
import BookmarkCard from "./bookmark-card";

const formSchema = z.object({
	url: z.url(),
	siteName: z.string().optional(),
	title: z.string().min(1),
	description: z.string().min(1),
	type: z.string().min(1),
	imageUrl: z.url(),
	image: z.string().optional(),
});

const OnlineForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [card, setCard] = useState(<CardSkeleton />);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			url: "",
			siteName: "",
			title: "",
			description: "",
			type: "",
			imageUrl: "",
			image: "",
		},
	});
	const urlValue = useWatch({
		control: form.control,
		name: "url",
	});
	const debouncedUrl = useDebounce(urlValue, 1000);
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		try {
			console.log(values);
			// await addBookmark(values);
			form.reset();
			toast.success(`Bookmark added successfully`);
			router.refresh();
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			toast.error(`Failed to add bookmark`);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		if (!debouncedUrl) return;

		const fetchOG = async () => {
			setIsLoading(true);
			try {
				const res = await fetch("/api/og", {
					method: "POST",
					body: JSON.stringify({ url: debouncedUrl }),
				});
				const data = await res.json();
				if (!data) return;
				form.setValue("title", data.title ?? "");
				form.setValue("description", data.description ?? "");
				form.setValue("siteName", data.site_name ?? "");
				form.setValue("type", data.type ?? "");
				form.setValue("imageUrl", data.image ?? "");
				form.setValue("image", data.image_base64 ?? "");
				const dataCard = [
					{
						id: "",
						url: debouncedUrl,
						siteName: data.site_name ?? "",
						title: data.title ?? "",
						description: data.description ?? "",
						type: data.type ?? "",
						imageUrl: data.image ?? "",
						image: data.image_base64 ?? "",
						date: "",
					},
				];
				setCard(<BookmarkCard data={dataCard} />);
			} catch (err) {
				console.error(err);
			}
			setIsLoading(false);
		};

		fetchOG();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedUrl]);

	return (
		<>
			<div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card>
					<CardContent>
						<form id="form-add-bookmark" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
							<FieldGroup>
								<Controller
									name="url"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="field-url">Url</FieldLabel>
											<Input
												{...field}
												id="field-url"
												aria-invalid={fieldState.invalid}
												placeholder="Url"
												type="url"
												autoComplete="off"
											/>
											{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
										</Field>
									)}
								/>
							</FieldGroup>
							<FieldGroup>
								<Controller
									name="siteName"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="field-siteName">Site Name</FieldLabel>
											<Input {...field} id="field-siteName" aria-invalid={fieldState.invalid} placeholder="Site Name" />
											{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
										</Field>
									)}
								/>
							</FieldGroup>
							<FieldGroup>
								<Controller
									name="title"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="field-title">Title</FieldLabel>
											<Input {...field} id="field-title" aria-invalid={fieldState.invalid} placeholder="Title" />
											{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
										</Field>
									)}
								/>
							</FieldGroup>
							<FieldGroup>
								<Controller
									name="description"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="field-description">Description</FieldLabel>
											<Textarea
												{...field}
												id="field-description"
												aria-invalid={fieldState.invalid}
												placeholder="Description"
											/>
											{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
										</Field>
									)}
								/>
							</FieldGroup>
							<FieldGroup>
								<Controller
									name="type"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="field-type">Type</FieldLabel>
											<Input {...field} id="field-type" aria-invalid={fieldState.invalid} placeholder="Type" />
											{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
										</Field>
									)}
								/>
							</FieldGroup>
							<FieldGroup>
								<Controller
									name="imageUrl"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="field-imageUrl">Image Url</FieldLabel>
											<Input
												{...field}
												id="field-imageUrl"
												aria-invalid={fieldState.invalid}
												placeholder="Image Url"
												type="url"
											/>
											{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
										</Field>
									)}
								/>
							</FieldGroup>
							<FieldGroup>
								<Controller
									name="image"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<Input {...field} id="field-image" aria-invalid={fieldState.invalid} type="hidden" />
										</Field>
									)}
								/>
							</FieldGroup>
							<Field orientation="horizontal">
								<Button type="button" variant="outline" onClick={() => form.reset()}>
									Reset
								</Button>
								<Button type="submit" form="form-add-bookmark" disabled={isLoading}>
									{isLoading ? <CircleNotchIcon className="size-4 animate-spin" /> : `Save`}
								</Button>
							</Field>
						</form>
					</CardContent>
				</Card>
				<Card>
					<CardContent>{card}</CardContent>
				</Card>
			</div>
		</>
	);
};

export default OnlineForm;
