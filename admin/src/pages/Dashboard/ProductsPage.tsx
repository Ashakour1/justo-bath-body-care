"use client";

import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoveHorizontalIcon, GripVertical, Save } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type Products = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  size: string[];
  isNew: boolean;
  inStock: boolean;
  image: string;
  order?: number;
};

// Sortable Row Component
function SortableTableRow({
  product,
  onUpdate,
  onDelete,
}: {
  product: Products;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={isDragging ? "bg-muted/50" : ""}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="cursor-grab active:cursor-grabbing p-1 h-auto"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </Button>
          <span>{product.name}</span>
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-10 h-10 object-cover rounded-md"
        />
      </TableCell>
      <TableCell className="hidden md:table-cell">{product.category}</TableCell>
      <TableCell className="text-left">${product.price.toString()}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {Array.isArray(product.size) ? product.size.join(", ") : product.size}
      </TableCell>
      <TableCell className="text-left">{product.rating}</TableCell>
      <TableCell className="text-left">
        <div className="flex flex-col gap-1">
          {product.inStock ? (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
            >
              In Stock
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
            >
              Out of Stock
            </Badge>
          )}
          {product.isNew && (
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200"
            >
              New
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="text-left">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoveHorizontalIcon className="w-4 h-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onUpdate(product.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(product.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default function ProductTable() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://justo-bath-body-care-siem.vercel.app/api/products/"
      );
      // Sort by order if available, otherwise by id
      const sortedData = data.sort((a: Products, b: Products) => {
        if (a.order && b.order) {
          return a.order - b.order;
        }
        return Number(a.id) - Number(b.id);
      });
      setProducts(sortedData);
    } catch (error) {
      console.log(error);
      toast("Failed to fetch products",)
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setProducts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const newOrder = arrayMove(items, oldIndex, newIndex);
        setHasChanges(true);
        return newOrder;
      });
    }
  };

  const handleSaveOrder = async () => {
    try {
      setLoading(true);
      const updatedProducts = products.map((product, index) => ({
        id: product.id,
        order: index + 1,
      }));

      // You'll need to implement this endpoint on your backend
      await axios.put(
        "https://justo-bath-body-care-siem.vercel.app/api/products/reorder",
        {
          products: updatedProducts,
        }
      );

      setHasChanges(false);
      toast("Product order saved successfully!");
    } catch (error) {
      console.log(error);
      toast("Failed to save product order");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (id: string) => {
    // You'll need to implement navigation here based on your routing setup
    // For React Router: navigate(`/dashboard/products/update/${id}`)
    // For Next.js: router.push(`/dashboard/products/update/${id}`)
    window.location.href = `/dashboard/products/update/${id}`;
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(
        `https://justo-bath-body-care-siem.vercel.app/api/products/${id}`
      );
      await fetchProducts(); // Refetch the products after deletion
      toast("Product deleted successfully!", );
    } catch (error) {
      console.log(error);
      toast("Failed to delete product");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center p-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl font-bold">Products List</h1>
          <p className="text-muted-foreground">
            List of all products available in the store. Drag and drop to
            reorder.
          </p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <Button onClick={handleSaveOrder} variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Save Order
            </Button>
          )}
          <Button
            onClick={() =>
              (window.location.href = "/dashboard/products/add-product")
            }
          >
            Add New Product
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-6 h-96">
          <h1 className="text-xl">Loading...</h1>
        </div>
      ) : products?.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-xl font-semibold">No Products Found</h1>
        </div>
      ) : (
        <div className="border rounded-sm p-2">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Image</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="text-left">Price</TableHead>
                  <TableHead className="hidden sm:table-cell">Size</TableHead>
                  <TableHead className="text-left">Rating</TableHead>
                  <TableHead className="text-left">Status</TableHead>
                  <TableHead className="text-left">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SortableContext
                  items={products.map((p) => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {products.map((product) => (
                    <SortableTableRow
                      key={product.id}
                      product={product}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                    />
                  ))}
                </SortableContext>
              </TableBody>
            </Table>
          </DndContext>
        </div>
      )}
    </div>
  );
}
