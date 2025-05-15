'use client'

import { CategoryDialog } from "@/components/categories/CategoryDialog";
import { CategoryTable } from "@/components/categories/CategoryTable";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/ui/delete-confirm-dialog";
import { User, UserDialog, UserFormValues } from "@/components/users/UserDialog";
import { UserTable } from "@/components/users/UserTable";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserPage() {
    const { toast } = useToast()
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isEditLoading, setIsEditLoading] = useState(false)
    const [isAddLoading, setIsAddLoading] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [data, setData] = useState<User[]>()
    const [serverErrors, setServerErrors] = useState<{ path: string, msg: string }[]>([])

    const handleEditDialog = (classes: User) => {
        setCurrentUser(classes)
        setIsEditDialogOpen(true)
    }
    const handleDeleteDialog = (classes: User) => {
        setCurrentUser(classes)
        setIsDeleteDialogOpen(true)
    }

    const deleteData = async () => {
        try {
            setIsDeleteLoading(true)
            const res = await axiosInstance.delete(`/users/${currentUser?.id}`)
            console.log(res.data);
            setData(data?.filter((item) => item.id !== currentUser?.id))
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
                const res = await axiosInstance.get("/users")
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

    const updateData = async (dataUpdate: UserFormValues) => {
        try {
            setIsEditLoading(true)
            const res = await axiosInstance.put(`/users/${currentUser?.id}`, dataUpdate)
            if (res.data.success) {
                toast({ description: res.data.message })
                setIsEditDialogOpen(!isEditDialogOpen)
                setData(data?.map(item => item.id === currentUser?.id ?
                    {
                        ...item,
                        email: res.data.data.email,
                        first_name: res.data.data.first_name,
                        last_name: res.data.data.last_name,
                        role: res.data.data.role
                    }
                    : item))
            }
        } catch (error: any) {
            const errors = error.response?.data?.errors || [];
            console.error("Gagal update User:", error.message)
            if (Array.isArray(errors)) {
                setServerErrors(errors)
            } else {
                toast({ description: error.response.message })
            }
        } finally {
            setIsEditLoading(false)
        }
    }
    const handleUpdateUser = async (data: UserFormValues) => {
        await updateData(data)
    }

    const addData = async (dataUser: UserFormValues) => {
        try {
            setIsAddLoading(true)
            const res = await axiosInstance.post("/users", dataUser)
            if (res.data.success) {
                toast({ description: res.data.message })
                setIsAddDialogOpen(!isAddDialogOpen)
                data?.push(res.data.data)
            }
        } catch (error: any) {
            const errors = error.response?.data?.errors || [];
            console.error("Gagal nambah User:", error.message)
            if (Array.isArray(errors)) {
                setServerErrors(errors)
            } else {
                toast({ description: error.response.message })
            }
        } finally {
            setIsAddLoading(false)
        }
    }
    const handleAddUser = async (data: UserFormValues) => {
        await addData(data)
    }

    useEffect(() => { document.title = "Users - Dashboard" }, [])
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">User</h2>
                    <p className="text-muted-foreground">
                        Manage all users here.
                    </p>
                </div>
                <div>
                    <Button onClick={() => { setIsAddDialogOpen(!isAddDialogOpen) }}>
                        <Plus className="mr-2 h-4 w-4" /> Add User
                    </Button>

                    <UserDialog
                        open={isAddDialogOpen}
                        onOpenChange={setIsAddDialogOpen}
                        onSave={handleAddUser}
                        title="Add User"
                        onLoading={isAddLoading}
                        serverErrors={serverErrors}
                    />
                </div>
            </div>
            <UserTable
                data={data!}
                isLoading={isLoading}
                onDelete={handleDeleteDialog}
                onEdit={handleEditDialog}
            />

            {currentUser && isEditDialogOpen && (
                <UserDialog
                    serverErrors={serverErrors}
                    onOpenChange={setIsEditDialogOpen}
                    open={isEditDialogOpen}
                    title="Edit User"
                    defaultValues={currentUser}
                    onSave={handleUpdateUser}
                    onLoading={isEditLoading}
                />
            )}

            {currentUser && isDeleteDialogOpen && (
                <DeleteConfirmDialog
                    titleButton="Delete"
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                    description={`Are you sure you want to delete this user ${currentUser.first_name}? This action cannot be undone!`}
                    title="Delete User"
                    onLoading={isDeleteLoading}
                    onConfirm={() => { deleteData() }}
                />
            )}
        </div>
    )
}