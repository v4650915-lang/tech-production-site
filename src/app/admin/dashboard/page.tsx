"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext, ProtectedRoute } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  ShoppingCart, 
  LogOut, 
  Plus, 
  ArrowRight,
  TrendingUp 
} from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const router = useRouter();
  const { signOut, user } = useAuthContext();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Выход выполнен", {
        description: "До скорой встречи!",
      });
      router.push("/admin/login");
    } catch (error) {
      toast.error("Ошибка выхода", {
        description: error instanceof Error ? error.message : "Не удалось выйти",
      });
    }
  };

  const stats = [
    {
      title: "Продукты",
      value: "11",
      description: "Вывески в каталоге",
      icon: Package,
      href: "/admin/products",
    },
    {
      title: "Заказы",
      value: "0",
      description: "Новых заказов",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b bg-white">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-montserrat font-bold">Админ-панель</h1>
              <p className="text-sm text-muted-foreground">
                {user?.email}
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-montserrat font-bold mb-2">Дашборд</h2>
            <p className="text-muted-foreground">
              Управление продуктами и заказами
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title} className="cursor-pointer hover:shadow-lg transition-shadow">
                <Link href={stat.href}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}

            {/* Quick Actions */}
            <Card className="border-dashed">
              <Link href="/admin/products/new">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Добавить продукт
                  </CardTitle>
                  <CardDescription>
                    Создать новый товар в каталоге
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    Создать
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Управление продуктами
                </CardTitle>
                <CardDescription>
                  Добавление, редактирование и удаление товаров
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button asChild>
                    <Link href="/admin/products">Все продукты</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/admin/products/new">Новый продукт</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Заказы
                </CardTitle>
                <CardDescription>
                  Просмотр и управление заказами клиентов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <Link href="/admin/orders">Все заказы</Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href="/admin/orders?status=new">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Новые
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
