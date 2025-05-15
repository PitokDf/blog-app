import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

export type User = {
    id: number
    first_name: string
    last_name: string
    email: string
    registered_at: string
    role: string;
    password: string
}

const getUserSchema = (isEdit: boolean) => z.object({
    first_name: z.string().min(3, "First name must be at least 3 characters"),
    last_name: z.string().optional(),
    email: z.string().nonempty("Email is required"),
    password: isEdit ? z.string().optional() : z.string().nonempty("Password is required"),
    role: z.string().nonempty("Role is required"),
})

export type UserFormValues = z.infer<ReturnType<typeof getUserSchema>> & { id?: number }

interface ServerError { path: string; msg: string }

interface UserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: UserFormValues) => Promise<void>;
    title: string;
    onLoading?: boolean;
    serverErrors?: ServerError[];
    defaultValues?: UserFormValues & { id?: number };
}
export function UserDialog({
    open,
    onOpenChange,
    onSave,
    title,
    onLoading,
    serverErrors,
    defaultValues = {
        email: "", first_name: "", last_name: "", password: "", role: ""
    }
}: UserDialogProps) {
    const isEdit = title === "Edit User"
    useEffect(() => {
        if (open && isEdit) form.reset(defaultValues)
    }, [open])

    useEffect(() => {
        serverErrors?.forEach(e => {
            if (e.path && form.getFieldState(e.path as keyof UserFormValues).invalid === false) {
                form.setError(e.path as keyof UserFormValues, {
                    type: "server",
                    message: e.msg
                })
            }
        })
    }, [serverErrors])

    const form = useForm<UserFormValues>({
        resolver: zodResolver(getUserSchema(isEdit)),
        defaultValues
    })

    const handleSubmit = form.handleSubmit(async (data) => {
        const userData = { ...data }
        if (isEdit && !userData.password) {
            delete userData.password
        }
        await onSave(defaultValues.id ? { ...userData, id: defaultValues.id } : userData)
        form.reset()
        console.log(userData);

        onOpenChange(false)
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        Fill in the details for class below.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-4 py-2">
                        <FormField
                            name="first_name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Pito" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="last_name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name (optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Desri" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. pitok@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123*****" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="role"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a Role" />
                                            </SelectTrigger>
                                            <SelectContent className="max-w-max">
                                                <SelectGroup>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                    <SelectItem value="writter">Writter</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="button" variant={"outline"} onClick={() => { onOpenChange(false) }}>Cancel</Button>
                            <Button disabled={onLoading} type="submit">Save {onLoading && <LoaderCircle className='animate-spin' />} </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}