'use client'

import { DeleteButton } from "@/components/DeleteButton";
import { EditButton } from "@/components/EditButton";
import { DataTable } from "@/components/ui/data-table";
type ClassTableProps = {
    isLoading: boolean;
    data: { id: number, name: string }[];
    onEdit: (classes: { id: number, name: string }) => void
    onDelete: (classes: { id: number, name: string }) => void
}

export function CategoryTable({
    onDelete, onEdit, isLoading, data
}: ClassTableProps) {
    return (
        <DataTable
            data={data}
            columns={[
                { header: "Name", accessorKey: "name" },
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