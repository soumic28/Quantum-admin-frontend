import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitSignup } from "../../api/auth";
import { BottomGradient } from "../../ui/BottomGradient";
import { BottomWarning } from "../../ui/BottomWarning";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";
import { LabelInputContainer } from "../../ui/LabelInputContainer";
import { useToast } from "../../ui/use-toast";

export function PartnerSignup() {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [pincode, setPincode] = useState<number>(0);
  const [role, setRole] = useState<string>("admin");
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handle Submit is called");
    if (password !== confirmPassword) {
      alert("Password does not match");
      return;
    }
    const data = {
      fullName: firstname + " " + lastname,
      email,
      password,
      phoneNumber,
      role,
      address: {
        state,
        city,
        street: address,
        pincode,
      },
    };
    try {
      console.log("Calling submit Signup");
      const response = await submitSignup(data);
      console.log("In PartnerSignUp", response);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("role", role);
      console.log(response?.data);
      toast({
        title: "Success",
        description: response.message,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    navigate("/dashboard");
  };
  return (
    <div className="my-16 ">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Quantum
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          let&apos;s get you started with your account
        </p>

        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder="Tyler"
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder="Durden"
                type="text"
                onChange={(e) => setLastname(e.target.value)}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="92288-85058"
              type="number"
              onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              aria-label="Select Role"
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setRole(e.target.value)}
              defaultValue={role}
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="admin">Admin</option>
              <option value="partner">Partner</option>
            </select>
          </LabelInputContainer>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="State">State</Label>
              <Input
                id="State"
                placeholder="West Bengal"
                type="text"
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="City">City</Label>
              <Input
                id="City"
                placeholder="Howrah"
                type="text"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="address"> Address</Label>
            <Input
              id="address"
              placeholder="44/1, mahatama gandhi road"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              placeholder="700001"
              type="number"
              onChange={(e) => setPincode(parseInt(e.target.value))}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmPassword">Confirm your Password</Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <BottomWarning
            label="Already have an account?"
            buttonText="Login"
            to="/login"
          />
        </form>
      </div>
    </div>
  );
}
