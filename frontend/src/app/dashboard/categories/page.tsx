'use client'

import { CategoryDialog } from "@/components/categories/CategoryDialog";
import { CategoryTable } from "@/components/categories/CategoryTable";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/ui/delete-confirm-dialog";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function ClassesPage() {
    const { toast } = useToast()
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
    const [currentCategory, setCurrentCategory] = useState<{ id: number, name: string } | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isEditLoading, setIsEditLoading] = useState(false)
    const [isAddLoading, setIsAddLoading] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [data, setData] = useState<{ id: number, name: string }[]>()
    const [serverErrors, setServerErrors] = useState<{ path: string, msg: string }[]>([])

    const handleEditDialog = (classes: { id: number, name: string }) => {
        setCurrentCategory(classes)
        setIsEditDialogOpen(true)
    }
    const handleDeleteDialog = (classes: { id: number, name: string }) => {
        setCurrentCategory(classes)
        setIsDeleteDialogOpen(true)
    }

    const deleteData = async () => {
        try {
            setIsDeleteLoading(true)
            const res = await axiosInstance.delete(`/categories/${currentCategory?.id}`)
            console.log(res.data);
            setData(data?.filter((item) => item.id !== currentCategory?.id))
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setIsDeleteLoading(false)
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true)
                const res = await axiosInstance.get("/categories")
                console.log(res.data);
                setData(res.data.data)
            } catch (error: any) {
                console.log(error.message);
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [])

    const updateData = async (name: string) => {
        try {
            setIsEditLoading(true)
            const res = await axiosInstance.put(`/categories/${currentCategory?.id}`, { name, slug: name.toLowerCase().replace(" ", "-") })
            if (res.data.success) {
                toast({ description: res.data.message })
                setIsEditDialogOpen(!isEditDialogOpen)
                setData(data?.map(item => item.id === currentCategory?.id ? { ...item, name: res.data.data.name } : item))
            }
        } catch (error: any) {
            const errors = error.response?.data?.errors || [];
            console.error("Gagal update category:", error.message)
            if (Array.isArray(errors)) {
                setServerErrors(errors)
            } else {
                toast({ description: error.response.message })
            }
        } finally {
            setIsEditLoading(false)
        }
    }
    const handleUpdateCategory = async (data: { name: string }) => {
        await updateData(data.name)
    }

    const addData = async (name: string) => {
        try {
            setIsAddLoading(true)
            const res = await axiosInstance.post("/categories", { name, slug: name.toLowerCase().replace(" ", "-") })
            if (res.data.success) {
                toast({ description: res.data.message })
                setIsAddDialogOpen(!isAddDialogOpen)
                data?.push({ id: res.data.data.id, name: res.data.data.name })
            }
        } catch (error: any) {
            const errors = error.response?.data?.errors || [];
            console.error("Gagal nambah category:", error.message)
            if (Array.isArray(errors)) {
                setServerErrors(errors)
            } else {
                toast({ description: error.response.message })
            }
        } finally {
            setIsAddLoading(false)
        }
    }
    const handleAddCategory = async (data: { name: string }) => {
        await addData(data.name)
    }

    useEffect(() => { document.title = "Categories - Dashboard" }, [])
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
                    <p className="text-muted-foreground">
                        Manage all categories here.
                    </p>
                </div>
                <div>
                    <Button onClick={() => { setIsAddDialogOpen(!isAddDialogOpen) }}>
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Button>

                    <CategoryDialog
                        open={isAddDialogOpen}
                        onOpenChange={setIsAddDialogOpen}
                        onSave={handleAddCategory}
                        title="Add CAtegory"
                        onLoading={isAddLoading}
                        serverErrors={serverErrors}
                    />
                </div>
            </div>
            <CategoryTable
                data={data!}
                isLoading={isLoading}
                onDelete={handleDeleteDialog}
                onEdit={handleEditDialog}
            />

            {currentCategory && isEditDialogOpen && (
                <CategoryDialog
                    serverErrors={serverErrors}
                    onOpenChange={setIsEditDialogOpen}
                    open={isEditDialogOpen}
                    title="Edit Class"
                    defaultValues={currentCategory}
                    onSave={handleUpdateCategory}
                    onLoading={isEditLoading}
                />
            )}

            {currentCategory && isDeleteDialogOpen && (
                <DeleteConfirmDialog
                    titleButton="Delete"
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                    description={`Are you sure you want to delete this category ${currentCategory.name}? This action cannot be undone!`}
                    title="Delete Category"
                    onLoading={isDeleteLoading}
                    onConfirm={() => { deleteData() }}
                />
            )}
        </div>
    )
}