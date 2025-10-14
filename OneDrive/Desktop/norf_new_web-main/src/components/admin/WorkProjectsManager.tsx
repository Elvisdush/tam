import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface WorkProject {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  display_order: number;
}

export const WorkProjectsManager = () => {
  const [projects, setProjects] = useState<WorkProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image_url: '',
    display_order: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('work_projects')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch work projects",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from('work_projects')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        toast({ title: "Success", description: "Project updated" });
      } else {
        const { error } = await supabase
          .from('work_projects')
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Success", description: "Project added" });
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (project: WorkProject) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      image_url: project.image_url,
      display_order: project.display_order
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('work_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Project deleted" });
      fetchProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      image_url: '',
      display_order: 0
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 p-6 border border-[#090909]/20 rounded-lg bg-white">
        <h3 className="text-xl font-semibold text-[#090909]">
          {editingId ? 'Edit' : 'Add'} Work Project
        </h3>
        
        <div>
          <Label htmlFor="title" className="text-[#090909]">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="bg-white text-[#090909] border-[#090909]/20"
          />
        </div>

        <div>
          <Label htmlFor="category" className="text-[#090909]">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="bg-white text-[#090909] border-[#090909]/20"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-[#090909]">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="bg-white text-[#090909] border-[#090909]/20"
          />
        </div>

        <div>
          <Label htmlFor="image_url" className="text-[#090909]">Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            required
            className="bg-white text-[#090909] border-[#090909]/20"
          />
        </div>

        <div>
          <Label htmlFor="display_order" className="text-[#090909]">Display Order</Label>
          <Input
            id="display_order"
            type="number"
            value={formData.display_order}
            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
            required
            className="bg-white text-[#090909] border-[#090909]/20"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">{editingId ? 'Update' : 'Add'}</Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#090909]">Work Projects</h3>
        {projects.map((project) => (
          <div key={project.id} className="p-4 border border-[#090909]/20 rounded-lg flex justify-between items-start bg-white">
            <div>
              <h4 className="font-semibold text-[#090909]">{project.title}</h4>
              <p className="text-sm text-[#090909]/60">{project.category}</p>
              <p className="text-sm mt-2 text-[#090909]">{project.description}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
