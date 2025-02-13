"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "../../services/auth.service";
import { useRouter } from "next/navigation";
import { Button, notification } from "antd";

const loginSchema = z.object({
  username: z.string().min(1, "Tài khoản không được để trống"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type TLoginForm = ReturnType<(typeof loginSchema)["parse"]>;

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: TLoginForm) => {
    // NHN0290877
    // 123qwe@..
    const payload: TLoginPayload = {
      app_key: "EDUZAA_V4",
      username: data.username,
      password: data.password,
    };
    loginMutation.mutate(payload);
  };

  //#region mutation
  const loginMutation = useMutation({
    mutationFn: (data: TLoginPayload) => loginService(data),
    onSuccess: (data) => {
      if (data?.isFailure) {
        notification.error({
          message: "Login Error",
          description: data.error.message,
        });
        return;
      }
      router.push("/dashboard");
    },
    onError: (err) => {
      notification.error({
        message: "Login Error",
        description: err.message,
      });
    },
  });

  //#endregion

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-blue-600">
        <Card className="w-96 p-6 bg-gray-900 text-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-xl text-red-200">
              Chào mừng trở lại!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Tài khoản *</label>
                <Input
                  {...register("username")}
                  className="mt-1 bg-gray-800 border-gray-700"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message?.toString()}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Mật khẩu *</label>
                <Input
                  {...register("password")}
                  type="password"
                  className="mt-1 bg-gray-800 border-gray-700"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message?.toString()}
                  </p>
                )}
              </div>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-700"
                type="primary"
                htmlType="submit"
                loading={loginMutation.isPending}
                disabled={loginMutation.isPending}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
