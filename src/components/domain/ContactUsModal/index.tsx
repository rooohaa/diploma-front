import { Box, Button, Drawer, Textarea, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { requiredRule } from "utils/formRules"
import { showNotification } from "@mantine/notifications"
import { useState } from "react"
import { Check, X } from "tabler-icons-react"
import { supabase } from "supabaseClient"

interface IContactUsModalProps {
  opened: boolean
  close: () => void
}

interface IContactUsFormValues {
  email: string
  fullName: string
  message: string
}

const ContactUsModal: React.FC<IContactUsModalProps> = ({ opened, close }) => {
  const [loading, setLoading] = useState(false)
  const form = useForm<IContactUsFormValues>({
    initialValues: {
      email: "",
      fullName: "",
      message: "",
    },
    validate: {
      email: requiredRule,
      fullName: requiredRule,
      message: requiredRule,
    },
  })

  const handleSubmit = async (values: IContactUsFormValues) => {
    const { email, fullName, message } = values

    setLoading(true)

    // Insert row to contact-messages table
    const { error } = await supabase.from("contact-messages").insert([
      {
        sender_email: email,
        sender_fullname: fullName,
        message,
      },
    ])

    setLoading(false)

    if (!error) {
      // Reset form and close modal
      form.reset()
      close()

      // Show success notif
      showNotification({
        title: "Thank you for filling out form!",
        message: "We will get back in touch with you soon!",
        autoClose: 5000,
        color: "teal",
        icon: <Check />,
      })
    } else {
      showNotification({
        message: "Ooops.. Service is not available",
        autoClose: 5000,
        color: "red",
        icon: <X />,
      })
    }
  }

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Contact us"
      position="right"
      padding="md"
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box sx={{ marginBottom: "16px" }}>
          <TextInput
            withAsterisk
            type="email"
            placeholder="Enter email"
            label="Email"
            {...form.getInputProps("email")}
          />
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <TextInput
            withAsterisk
            type="text"
            placeholder="Enter fullname"
            label="Fullname"
            {...form.getInputProps("fullName")}
          />
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <Textarea
            withAsterisk
            minRows={4}
            maxRows={6}
            placeholder="Enter message"
            label="Message"
            {...form.getInputProps("message")}
          />
        </Box>

        <Box>
          <Button type="submit" fullWidth loading={loading}>
            Send
          </Button>
        </Box>
      </form>
    </Drawer>
  )
}

export { ContactUsModal }
