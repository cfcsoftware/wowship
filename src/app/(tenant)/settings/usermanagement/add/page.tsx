"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import { tenantAuthHandler } from "@/utils/tenantAuthHandler";

/* =======================
   Types
======================= */

interface AddEmployeePayload {
  email: string;
  username: string;
  password: string;
  phone: string;
  role: number;

  name: string;
  designation: string;
  gender: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
}

/* =======================
   Component
======================= */

const AddEmployeePage = () => {
  const router = useRouter();

  const [form, setForm] = useState<AddEmployeePayload>({
    email: "",
    username: "",
    password: "",
    phone: "",
    role: 5,

    name: "",
    designation: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /* =======================
     Handlers
  ======================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await tenantAuthHandler(
        "/staff/employee/register?api=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      setSuccess("Employee registered successfully!");

      setTimeout(() => {
        router.push("/employee-management/employee/list");
      }, 1200);
    } catch {
      setError("Failed to register employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     UI
  ======================= */

  return (
    <div className="p-6 bg-[#F2F2F7] min-h-screen w-full">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl bg-white hover:bg-[#F2F2F7] shadow-sm"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-3xl font-bold text-[#1C1C1E] tracking-tight">
          Add Employee
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-sm p-8 w-full"
      >
        {/* Status */}
        {error && (
          <div className="mb-6 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 text-sm text-green-600 bg-green-50 px-4 py-3 rounded-xl">
            {success}
          </div>
        )}

        {/* Account + Personal Info */}
        <Section title="Employee Information" columns={3}>
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} required />
          <Input label="Username" name="username" value={form.username} onChange={handleChange} required />
          <Input label="Email" name="email" value={form.email} onChange={handleChange} required />

          <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} required />
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} required />
          <Input label="Designation" name="designation" value={form.designation} onChange={handleChange} />

          <Select label="Gender" name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
          <Input label="Date of Birth" type="date" name="dob" value={form.dob} onChange={handleChange} />
          <Input label="Role ID" name="role" type="number" value={form.role} onChange={handleChange} />
        </Section>

        {/* Address */}
        <Section title="Address Details" columns={3}>
          <Input label="Address" name="address" value={form.address} onChange={handleChange} />
          <Input label="City" name="city" value={form.city} onChange={handleChange} />
          <Input label="State" name="state" value={form.state} onChange={handleChange} />
          <Input label="Zip Code" name="zip_code" value={form.zip_code} onChange={handleChange} />
        </Section>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-xl text-sm font-medium bg-[#F2F2F7] hover:bg-[#E5E5EA]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 shadow-md flex items-center gap-2 disabled:opacity-60"
          >
            <Save size={16} />
            {loading ? "Saving..." : "Save Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeePage;

/* =======================
   UI Helpers
======================= */

const Section = ({
  title,
  columns,
  children,
}: {
  title: string;
  columns: 2 | 3;
  children: React.ReactNode;
}) => (
  <div className="mb-10">
    <h2 className="text-lg font-bold text-[#1C1C1E] mb-4">{title}</h2>
    <div
      className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}
    >
      {children}
    </div>
  </div>
);

const Input = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div>
    <label className="block text-xs font-bold text-[#8E8E93] mb-2 uppercase">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-2.5 bg-[#F2F2F7] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20"
    />
  </div>
);

const Select = ({
  label,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-xs font-bold text-[#8E8E93] mb-2 uppercase">
      {label}
    </label>
    <select
      {...props}
      className="w-full px-4 py-2.5 bg-[#F2F2F7] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20"
    >
      {children}
    </select>
  </div>
);
