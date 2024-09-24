"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AcceptedSubmission, User } from "./leetcodeType";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import NumberTicker from "@/components/magicui/number-ticker";
import { motion } from "framer-motion";

import { infinity } from "ldrs";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

infinity.register();

export default function Leetcode() {
  const [user, setUser] = useState<User>();
  const [acceptedSub, setAcceptedSub] = useState<AcceptedSubmission[]>([]);
  console.log(user);
  const fetchUser = async () => {
    const [profile, stats, acceptedSubReq] = await Promise.all([
      await fetch(`${process.env.NEXT_PUBLIC_LEETCODE_API}/Tryphonpatta`),
      await fetch(
        `${process.env.NEXT_PUBLIC_LEETCODE_API}/userProfile/Tryphonpatta`
      ),
      await fetch(
        `${process.env.NEXT_PUBLIC_LEETCODE_API}/Tryphonpatta/acSubmission`
      ),
    ]);
    const [data, fullStatsData, acceptedSubData] = await Promise.all([
      await profile.json(),
      await stats.json(),
      await acceptedSubReq.json(),
    ]);
    console.log(acceptedSubData);
    setAcceptedSub(acceptedSubData.submission);
    setUser({ ...data, solved: fullStatsData.totalSolved });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }} // Starting point of the animation (fully transparent)
      animate={{ opacity: 1 }} // End point of the animation (fully visible)
      transition={{ duration: 0.8 }} // Time it takes to fade in
    >
      <div className="w-[600px]">
        <Card>
          <CardHeader>
            <CardTitle>Leetcode</CardTitle>
            <CardDescription>{"Leetcode's stat"}</CardDescription>
          </CardHeader>
          {user ? (
            <CardContent>
              <div className="flex flex-col gap-6">
                <Card>
                  <div className="m-2 flex gap-4">
                    <div>
                      <Avatar className="w-[45px] h-[45px]">
                        <AvatarImage
                          width={45}
                          height={45}
                          src={user?.avatar}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p>{user?.username}</p>
                      <p className=" text-gray-500	">{user?.name}</p>
                    </div>
                  </div>
                </Card>
                <div className="flex gap-2">
                  <p>Ranking : </p>
                  <NumberTicker value={user?.ranking} />
                </div>
                <div className="flex gap-2">
                  <p>All Problems Solved : </p>
                  <NumberTicker value={user?.solved} />
                </div>
                <Marquee>
                  {acceptedSub.map((sub, index) => {
                    return (
                      <div
                        key={index}
                        className="w-fit flex justify-center p-2 border rounded-md items-center gap-2"
                      >
                        {/* <p className="text-gray-500">{sub.lang}</p> */}
                        <div className=" w-[30px] flex justify-center items-center">
                          {sub.lang == "cpp" && (
                            <Image
                              src="/cpp.svg"
                              alt="cpp"
                              width={30}
                              height={30}
                              priority
                            />
                          )}
                          {(sub.lang == "python" || sub.lang == "python3") && (
                            <Image
                              src="/python.webp"
                              alt="python"
                              width={30}
                              height={30}
                              priority
                            />
                          )}
                        </div>
                        <p className="">{sub.title}</p>
                      </div>
                    );
                  })}
                </Marquee>
              </div>
            </CardContent>
          ) : (
            <CardContent>
              <div className="flex w-full h-full justify-center items-center">
                <l-infinity
                  size="55"
                  stroke="4"
                  stroke-length="0.15"
                  bg-opacity="0.1"
                  speed="1.3"
                  color="black"
                ></l-infinity>
              </div>
            </CardContent>
          )}
          <CardFooter></CardFooter>
        </Card>
      </div>
    </motion.div>
  );
}
