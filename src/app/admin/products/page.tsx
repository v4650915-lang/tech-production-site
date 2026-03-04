"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext, ProtectedRoute } from "@/contexts/auth-context";
import { useProducts } from "@/hooks/use-products";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Edit, Trash2, LogOut, ArrowLeft, Upload, Loader2 } from "lucide-react";

// Категории продуктов
const categories = [
  { value: "signs", label: "Вывески" },
  { value: "printing", label: "Печать" },
  { value: "cutting", label: "Резка" },
  { value: "mangals", label: "Мангалы" },
  { value: "stands", label: "Стенды" },
  { value: "souvenirs", label: "Сувениры" },
];

const categoryLabels: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.value, c.label])
);

// Тип для формы редактирования
interface EditFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const { signOut } = useAuthContext();
  const { products, loading, error } = useProducts();

  // Состояние диалога редактирования
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [editForm, setEditForm] = useState<EditFormData>({
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
  });
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Ref для скрытого file input в диалоге
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Открытие диалога редактирования ---
  const handleOpenEdit = (product: any) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price?.toString() || "0",
      category: product.category || "",
      image_url: product.image_url || "",
    });
    setNewImageFile(null);
    setNewImagePreview("");
    setEditDialogOpen(true);
  };

  // --- Выбор нового файла фото ---
  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      setNewImagePreview(URL.createObjectURL(file));
    }
  };

  // --- Сохранение изменений ---
  const handleSaveEdit = async () => {
    if (!editForm.name || !editForm.category) {
      toast.error("Заполните название и категорию");
      return;
    }

    try {
      setIsUpdating(true);

      let imageUrl = editForm.image_url;

      // Если выбрано новое фото — загружаем в Supabase Storage
      if (newImageFile) {
        const fileExt = newImageFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, newImageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      // Обновляем запись в БД
      const { error: updateError } = await supabase
        .from("products")
        .update({
          name: editForm.name,
          description: editForm.description,
          price: parseFloat(editForm.price) || 0,
          category: editForm.category,
          image_url: imageUrl,
        })
        .eq("id", selectedProduct.id);

      if (updateError) throw updateError;

      toast.success("Продукт обновлён", {
        description: `${editForm.name} успешно сохранён`,
      });
      setEditDialogOpen(false);

      // Перезагрузка страницы чтобы отобразить свежие данные
      router.refresh();
    } catch (err) {
      console.error("Ошибка обновления:", err);
      toast.error("Ошибка сохранения", {
        description: err instanceof Error ? err.message : "Не удалось сохранить",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // --- Удаление продукта ---
  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот продукт?")) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      toast.success("Продукт удалён");
      router.refresh();
    } catch (error) {
      toast.error("Ошибка удаления", {
        description: error instanceof Error ? error.message : "Не удалось удалить",
      });
    }
  };

  // --- Выход из аккаунта ---
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Выход выполнен");
      router.push("/admin/login");
    } catch {
      toast.error("Ошибка выхода");
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "По запросу";
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p>Загрузка продуктов...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-stone-50">
        {/* Шапка */}
        <header className="border-b bg-white">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/admin/dashboard">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-montserrat font-bold">Продукты</h1>
                <p className="text-sm text-muted-foreground">
                  Управление каталогом товаров
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>
        </header>

        {/* Основной контент */}
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-montserrat font-bold mb-2">
                Все продукты
              </h2>
              <p className="text-muted-foreground">
                {products.length} товаров в каталоге
              </p>
            </div>
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Добавить продукт
              </Link>
            </Button>
          </div>

          {error && (
            <Card className="mb-6 border-destructive">
              <CardContent className="pt-6">
                <p className="text-destructive">{error}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Фото</TableHead>
                      <TableHead>Название</TableHead>
                      <TableHead>Описание</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Цена</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-12 w-12 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-muted-foreground text-sm">
                          {(product as any).description || "—"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {categoryLabels[product.category] || product.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatPrice(product.price)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {/* Кнопка редактирования */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenEdit(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {/* Кнопка удаления */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* ===== Диалог редактирования продукта ===== */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Редактировать продукт</DialogTitle>
            </DialogHeader>

            <div className="space-y-5 pt-2">
              {/* Фото */}
              <div className="space-y-2">
                <Label>Фотография</Label>
                <div className="flex items-center gap-4">
                  {/* Превью: сначала новое, если нет — текущее */}
                  <img
                    src={newImagePreview || editForm.image_url || "/images/placeholder.jpg"}
                    alt="Превью"
                    className="h-24 w-24 object-cover rounded-lg border"
                  />
                  <div>
                    {/* Скрытый файловый инпут */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleNewImageChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Заменить фото
                    </Button>
                    {newImageFile && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Выбран: {newImageFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Название */}
              <div className="space-y-2">
                <Label htmlFor="edit-name">Название *</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Название продукта"
                />
              </div>

              {/* Описание */}
              <div className="space-y-2">
                <Label htmlFor="edit-description">Описание</Label>
                <Textarea
                  id="edit-description"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Описание продукта..."
                  rows={3}
                />
              </div>

              {/* Цена и категория */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Цена (₽)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    placeholder="0 = По запросу"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Категория *</Label>
                  <Select
                    value={editForm.category}
                    onValueChange={(val) => setEditForm({ ...editForm, category: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1"
                  onClick={handleSaveEdit}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    "Сохранить"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditDialogOpen(false)}
                  disabled={isUpdating}
                >
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
