'use client'

import { DeleteButton } from "@/components/DeleteButton";
import { EditButton } from "@/components/EditButton";
import { DataTable } from "@/components/ui/data-table";
import { User, UserFormValues } from "./UserDialog";
type ClassTableProps = {
    isLoading: boolean;
    data: User[];
    onEdit: (classes: User) => void
    onDelete: (classes: User) => void
}

export function UserTable({
    onDelete, onEdit, isLoading, data
}: ClassTableProps) {
    return (
        <DataTable
            data={data}
            columns={[
                {
                    header: "Name", accessorKey: "first_name", cell: (item) => (
                        <>
                            <span>{item.first_name}</span>{item.last_name && (<> {item.last_name}</>)}
                        </>
                    )
                },
                { header: "Email", accessorKey: "email" },
                { header: "Role", accessorKey: "role" },
                {
                    header: "Actions", accessorKey: "id",
                    cell: (data) => (
                        <div className="flex justify-end gap-2">
                            <EditButton onEdit={() => onEdit(data)} />
                            <DeleteButton onDelete={() => onDelete(data)} />
                        </div>
                    )
                }
            ]}
            isLoading={isLoading}
            emptyMessage="No categories found"
        />
    )
}