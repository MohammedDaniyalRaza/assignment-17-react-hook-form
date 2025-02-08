"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Mail, User, Calendar, ArrowLeft } from "lucide-react";

interface UserData {
  username: string;
  email: string;
  createdAt: string;
}

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (!storedData) {
      router.push("/");
      return;
    }
    setUserData(JSON.parse(storedData));
  }, [router]);

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-4"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center text-2xl font-bold">
                {userData.username[0].toUpperCase()}
              </div>
            </Avatar>
            <CardTitle className="text-3xl font-bold">{userData.username}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base">{userData.email}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center space-x-4">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Username</p>
                  <p className="text-base">{userData.username}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Member Since</p>
                  <p className="text-base">
                    {new Date(userData.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}