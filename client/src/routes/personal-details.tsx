import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/personal-details')({
  component: PersonalDetails,
});

function PersonalDetails() {
  return (
    <>
      <div className="card m-4 bg-base-300">
        <div className="card-body">
          <div className="card-title self-center">Personal Details</div>
          <p className="text-center">
            Update your name, phone number, email, and account password at any
            time.
          </p>

          <div className="my-2">
            <p className="mb-4 mt-2">Email</p>
            <div className="my-2 flex flex-col gap-2">
              <input
                type="email"
                placeholder="New Email Address"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="email"
                placeholder="Confirm Email Address"
                className="input input-bordered w-full max-w-xs"
              />
              <button className="btn btn-primary">Save</button>
            </div>

            <p className="my-4">Password</p>
            <div className="my-2 flex flex-col gap-2">
              <input
                type="password"
                placeholder="New Password"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full max-w-xs"
              />
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
