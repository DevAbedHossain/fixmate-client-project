import {
    Plus,
    Trash2,
    Wrench,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";



const ServiceCardCTA = () => {
    return (
        <>
            {/* Add / Edit Dialog */}
            <Dialog >
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader>
                        <DialogTitle>
                            {/* {editing ? "Edit service" : "Add a service"} */}
                        </DialogTitle>
                    </DialogHeader>

                    {/* <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            saveService();
                        }}
                        className="space-y-5 py-3"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="service-name">Service name</Label>
                            <Input
                                id="service-name"
                                required
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                placeholder="Enter service name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select
                                value={form.category}
                                onValueChange={(value: Category) =>
                                    setForm({ ...form, category: value })
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="service-price">Price ($)</Label>
                            <Input
                                id="service-price"
                                type="number"
                                min="0"
                                step="0.01"
                                required
                                value={form.price}
                                onChange={(e) =>
                                    setForm({ ...form, price: e.target.value })
                                }
                                placeholder="0.00"
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#FF681B] text-white hover:bg-[#E95C12]"
                            >
                                {editing ? "Save changes" : "Add service"}
                            </Button>
                        </DialogFooter>
                    </form> */}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this service?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will remove the service from your list.
                            It cannot be undone in this session.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete service
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default ServiceCardCTA;