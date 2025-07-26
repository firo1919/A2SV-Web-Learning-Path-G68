"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCreateBookmarkMutation, useDeleteBookmarkMutation } from "../store/features/api/bookmarksSlice";
import type JobPost from "../types/jobPost";
import Category from "./Category";
import JopPlace from "./JopPlace";

interface Props {
	readonly jobpost: JobPost;
}

function JobListCard({ jobpost }: Props) {
	const categories = [];
	const { data: session } = useSession();
	const [createBookmark] = useCreateBookmarkMutation();
	const [deleteBookmark] = useDeleteBookmarkMutation();
	const [bookmarked, setBookmarked] = useState(jobpost.isBookmarked);
	const [disableBookmarkBtn, setDisableBookmarkBtn] = useState(false);

	useEffect(() => {
		setBookmarked(jobpost.isBookmarked);
	}, [jobpost.isBookmarked]);

	async function handleCreateBookmark() {
		setDisableBookmarkBtn(true);
		try {
			const response = await createBookmark(jobpost.id).unwrap();
			console.log("successfull", response);
			setBookmarked(true);
			toast("Bookmark created successfully", {
				draggable: false,
				theme: "colored",
				hideProgressBar: true,
				type: "success",
			});
		} catch (error) {
			console.log("rejected", error);
			toast("Bookmark not created", { draggable: false, theme: "colored", hideProgressBar: true, type: "error" });
		}
		setDisableBookmarkBtn(false);
	}

	async function handleDeleteBookmark() {
		setDisableBookmarkBtn(true);
		try {
			const response = await deleteBookmark(jobpost.id).unwrap();
			console.log("successfull", response);
			toast("Bookmark removed successfully", {
				draggable: false,
				theme: "colored",
				hideProgressBar: true,
				type: "success",
			});
			setBookmarked(false);
		} catch (error) {
			console.log("rejected", error);
			toast("Bookmark not removed", { draggable: false, theme: "colored", hideProgressBar: true, type: "error" });
		}
		setDisableBookmarkBtn(false);
	}

	for (let i = 0; i < 2 && i < jobpost.categories.length; i += 1) {
		categories.push(jobpost.categories[i]);
	}
	return (
		<div className="relative flex p-6 rounded-[30px] border border-[#D6DDEB] hover:-translate-y-1 hover:shadow-md hover:scale-105 transition delay-150 duration-300">
			<div className="w-[66px] mr-6 relative shrink-0">
				<Image
					src={jobpost.logoUrl || "/job1.png"}
					fill
					alt="company image"
					className=" object-contain object-top"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">{jobpost.title}</p>
				<div className="flex items-center text-[16px] font-normal text-[#7C8493]">
					<p>{jobpost.orgName}</p>
					<div className="mx-2 w-1 h-1 bg-[#7C8493] rounded-full"></div>
					<p>{jobpost.location.join(", ")}</p>
				</div>
				<p className="text-[16px] leading-7">{jobpost.description}</p>
				<div className="flex gap-2 items-center h-[31px]">
					<JopPlace opType={jobpost.opType} />
					<div className="w-[1px] bg-[#D6DDEB] h-full"></div>
					<div className="flex gap-2">
						{categories.map((cat, id) => (
							<Category key={id} category={cat} />
						))}
					</div>
				</div>
			</div>
			{session && (
				<button
					disabled={disableBookmarkBtn}
					onClick={bookmarked ? handleDeleteBookmark : handleCreateBookmark}
					className={`absolute right-5 top-5 text-2xl border-2 border-orange-300  p-2 rounded-full outline-none hover:bg-orange-100 cursor-pointer ${
						!bookmarked ? "text-gray-400" : "text-orange-300"
					}`}
				>
					<FaStar className="" />
				</button>
			)}
			<Link href={`/joblist/${jobpost.id}`} className="absolute top-0 left-0 bottom-0 w-3/4"></Link>
		</div>
	);
}
export default JobListCard;
