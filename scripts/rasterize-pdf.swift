import AppKit
import PDFKit

guard CommandLine.arguments.count >= 3 else { exit(2) }

let url = URL(fileURLWithPath: CommandLine.arguments[1])
let prefix = CommandLine.arguments[2]
guard let doc = PDFDocument(url: url) else { exit(1) }

for index in 0 ..< doc.pageCount {
  guard let page = doc.page(at: index) else { continue }
  let image = page.thumbnail(of: CGSize(width: 794, height: 1123), for: .mediaBox)
  guard let tiff = image.tiffRepresentation,
        let rep = NSBitmapImageRep(data: tiff),
        let png = rep.representation(using: .png, properties: [:])
  else { continue }
  let out = URL(fileURLWithPath: "\(prefix)-pdf-\(index + 1).png")
  try png.write(to: out)
}

print(doc.pageCount)
